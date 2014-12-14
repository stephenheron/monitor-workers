exec {"apt-get update":
    path => "/usr/bin",
}

package {"nodejs-legacy":
    ensure => present,
    require => Exec["apt-get update"],
}

package {"default-jre":
    ensure => present,
    require => Exec["apt-get update"],
}

package {"npm":
    ensure => present,
    require => Package["nodejs-legacy"],
}

